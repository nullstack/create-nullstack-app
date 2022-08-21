const { Nulla, i18n } = require('../src/modules');
const fs = require('fs');
const path = require('path');
const mock = require('mock-fs');

test('testName do nothing if name is valid', () => {
  process.exit = jest.fn();
  const valids = ['project-name', 'projectname'].filter(n => Nulla.testName(n));

  expect(valids.length).toBe(2);
  expect(process.exit).not.toBeCalled();
});

test('testName exits process and warns if name is invalid', () => {
  process.exit = jest.fn();
  console.log = jest.fn();
  const valid = Nulla.testName('Project');

  expect(valid).toBe(false);
  expect(console.log).toBeCalled();
  expect(process.exit).toBeCalled();
});

const getNamesObject = (...args) => ({
  argName: args[0], projectSlug: args[1], projectName: args[2]
});

test('storeNames formats and return names', () => {
  process.exit = jest.fn();
  const names = [
    [
      'Project name',
      getNamesObject('Project name', 'project-name', 'Project Name')
    ],
    [
      '  project-name',
      getNamesObject('project-name', 'project-name', 'Project Name')
    ]
  ];

  names.forEach((name) => {
    const formatted = Nulla.storeNames(name[0]);
    expect(formatted).toStrictEqual(name[1]);
  });
  expect(process.exit).not.toBeCalled();
});

test('storeNames calls process.exit if projectSlug is invalid', () => {
  process.exit = jest.fn();
  const names = [
    `'Project   Name41 '`,
    `@@Project/Name`,
    `/Project`
  ];

  names.forEach(Nulla.storeNames);
  expect(process.exit).toBeCalledTimes(3);
});

test(
  'errorHandler warns if projectFolder already exists otherwise shows all',
  () => {
  console.log = jest.fn();
  Nulla.errorHandler({ code: 'EEXIST'});
  expect(console.log).toBeCalledWith(i18n.error.alreadyExists);

  console.log = jest.fn();
  const otherError = { code: 'OTHER'};
  Nulla.errorHandler(otherError);
  expect(console.log).toBeCalledWith(i18n.error.default, otherError);
});

test('contentReplacer replaces content based on regex', () => {
  const contents = [
    ['test {{PROJECT_NAME}}', 'NAME', 'Project', 'test Project'],
    ['test {{PROJECT_SLUG}}', 'SLUG', 'My Project', 'test My Project'],
    [
      'test {{PROJECT_NAME}}{{PROJECT_SLUG}}',
      'SLUG', 'my-project', 'test {{PROJECT_NAME}}my-project'
    ]
  ];

  contents.forEach(v => {
    const content = Nulla.contentReplacer(...v.slice(0, 3));
    expect(content).toBe(v.slice(3)[0]);
  });
});

const projectFilesRoot = [
  'package.json', 'server.js', 'README.md', '_gitignore'
];

describe("functions using filesystem", () => {

  test('getFiles should get all template files', () => {
    mock({
      [path.join(__dirname, '../src/template')]: {
        'package.json': '', 'server.js': '', 'README.md': '', '_gitignore': '',
        public: { image1: '', image2: '' }
      }
    });

    const Files  = { images: [], files: [] };
    Nulla.getFiles(path.join(__dirname, '../src/template'), Files);
    const files = projectFilesRoot;

    expect(Files.files.length).toBe(4);
    expect(
      files.filter(file => Files.files.includes(file)).length
    ).toBe(4);

    expect(Files.images.length).toBe(2);
    expect(
      Files.images[0].includes('public') &&
      Files.images[1].includes('public')
    ).toBeTruthy();
  });

  test('run() should copy all project files', async () => {
    mock({
      [path.join(__dirname, '../src')]: {
        template: mock.load(path.resolve(__dirname, '../src/template'))
      }
    });

    Nulla.run(getNamesObject('Project', 'project', 'Project'));

    const files = fs.readdirSync(path.join(__dirname, '../'));
    expect(files.includes('project')).toBeTruthy();

    let rootFiles = [
      ...projectFilesRoot.slice(0, 3),
      '.gitignore', 'public', 'src'
    ];

    const projectFiles = fs.readdirSync(path.join(__dirname, '../project'));
    expect(
      rootFiles.filter(file => projectFiles.includes(file)).length
    ).toBe(6);

    const srcFiles = fs.readdirSync(path.join(__dirname, '../project/src'));
    expect(srcFiles.includes('Application.jsx')).toBeTruthy();
  });

  test(
    'tryRun() should close rl, run() and throw if project already exists',
    async () => {
    const rl = { close: jest.fn() };
    const mockedRun = jest.spyOn(Nulla, 'run');
    mock({
      [path.join(__dirname, '../Project')]: {},
      [path.join(__dirname, '../src')]: {
        template: mock.load(path.resolve(__dirname, '../src/template'))
      }
    });

    Nulla.tryRun(rl, 'Project', false, false);
    expect(rl.close).toBeCalled();
    expect(Nulla.run).toBeCalledWith(
      getNamesObject('Project', 'project', 'Project'),
      false
    );

    mockedRun.mockRestore();
    Nulla.errorHandler = jest.fn();
    Nulla.tryRun(rl, 'Project', false, false);

    expect(Nulla.errorHandler).toBeCalled();
  });

  afterEach(mock.restore);
});

afterEach(() => {
  jest.restoreAllMocks();
  jest.resetModules();
});