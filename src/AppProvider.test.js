import AppProvider from './AppProvider';
import $ from 'jquery';
import { API_SEARCH_URL } from './config';

describe('AppProvider', () => {
  let provider;

  beforeEach(() => {
    provider = new AppProvider();
    provider.setState = jest.fn();
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
  });

  it('Sets to loading results before resolving/rejecting ajax request', () => {
    $.ajax.mockReturnValue(new Promise(() => {}));

    provider.search();
    expect(provider.setState).toHaveBeenCalledWith({ isLoadingResults: true });
  });

  it('Sends correct params to API', async () => {
    provider.state = {...provider.state, term: 'Foo', type: 'Bar', token: 'Baz'};
    $.ajax.mockImplementation(() => Promise.resolve());

    await provider.search();

    expect($.ajax).toHaveBeenCalledWith({
      url: API_SEARCH_URL,
      type: 'GET',
      data: { term: 'Foo', type: 'Bar' },
      headers: { Authorization: 'Bearer Baz' },
      dataType: 'json',
    });
  });

  it('Logout if ajax request rejects', async () => {
    $.ajax.mockImplementation(() => Promise.reject());

    await provider.search();

    expect(provider.setState).toHaveBeenCalledWith({
      token: '',
      isLoggedIn: false,
      isLoadingResults: false,
    });
  });

  it('Sets results if ajax request resolves', async () => {
    $.ajax.mockImplementation(() => Promise.resolve([{ this: 'is', some: 'data' }]));

    await provider.search();

    expect(provider.setState).toHaveBeenCalledWith({
      isLoadingResults: false,
      results: [{ this: 'is', some: 'data' }],
    });
  });
});