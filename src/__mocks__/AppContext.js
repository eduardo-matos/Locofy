import context from './context';

const AppContext = ({
  Consumer(props) {
    return props.children(context);
  },
  Provider(props) {
    return props.children;
  },
});

export default AppContext;
