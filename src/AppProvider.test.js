import AppProvider from './AppProvider';
import { API_SEARCH_URL } from './config';

describe('AppProvider', () => {
  let provider;

  beforeEach(() => {
    global.$ = { ajax: jest.fn() };
    provider = new AppProvider();
    provider.setState = jest.fn();
  });

  afterEach(() => {
    delete global.$;
  });

  it('Loads token from localstorage on startup', () => {
    localStorage.getItem.mockReturnValue('Foobar');
    const prov = new AppProvider();

    expect(prov.state.token).toEqual('Foobar');
    expect(prov.state.isLoggedIn).toBeTruthy();
    expect(localStorage.getItem).toHaveBeenCalledWith('token');
  });

  it('Sets a term', () => {
    provider.setTerm('Spam');
    expect(provider.setState).toHaveBeenCalledWith({ term: 'Spam' });
  });

  it('Sets a type', () => {
    provider.setType('Fish');
    expect(provider.setState).toHaveBeenCalledWith({ type: 'Fish' });
  });

  it('Sets a token', () => {
    provider.setToken('Meat');
    expect(provider.setState).toHaveBeenCalledWith({ token: 'Meat', isLoggedIn: true });
    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'Meat');
  });

  it('Sets to loading results before resolving/rejecting ajax request', () => {
    global.$.ajax.mockReturnValue(new Promise(() => {}));

    provider.search();
    expect(provider.setState).toHaveBeenCalledWith({ isLoadingResults: true });
  });

  it('Sends correct params to API', async () => {
    provider.state = {
      ...provider.state,
      term: 'Foo',
      type: 'Bar',
      token: 'Baz',
    };
    global.$.ajax.mockImplementation(() => Promise.resolve());

    await provider.search();

    expect(global.$.ajax).toHaveBeenCalledWith({
      url: API_SEARCH_URL,
      type: 'GET',
      data: { term: 'Foo', type: 'Bar' },
      headers: { Authorization: 'Bearer Baz' },
      dataType: 'json',
    });
  });

  it('Logout if ajax request rejects', async () => {
    global.$.ajax.mockImplementation(() => Promise.reject());

    await provider.search();

    expect(provider.setState).toHaveBeenCalledWith({
      token: '',
      isLoggedIn: false,
      isLoadingResults: false,
    });
  });

  it('Sets results if ajax request resolves', async () => {
    global.$.ajax.mockImplementation(() => Promise.resolve([{ this: 'is', some: 'data' }]));

    await provider.search();

    expect(provider.setState).toHaveBeenCalledWith({
      isLoadingResults: false,
      results: [{ this: 'is', some: 'data' }],
    });
  });
});
