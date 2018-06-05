import context from './context';

const AppContext = ({
  Consumer(props) {
    return props.children(context);
  },
});

export default AppContext;
