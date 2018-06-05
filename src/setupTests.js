import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import context from './__mocks__/context';

configure({ adapter: new Adapter() });

jest.mock('./AppContext');

beforeEach(() => {
  global.localStorage = {
    setItem: jest.fn(),
    getItem: jest.fn(),
  };

  context.state = {
    results: [],
    type: 'artist',
    term: '',
    token: '',
    isLoggedIn: false,
    isLoadingResults: false,
  };

  context.setToken = jest.fn();
  context.setTerm = jest.fn();
  context.setType = jest.fn();
  context.search = jest.fn();
});

