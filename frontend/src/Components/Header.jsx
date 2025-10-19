const { AppLogo } = require('../assets/images/images');

const Header = () => {
  return (
    <div id="header">
      <div id="leftSide">
        <img id="appLogo" src={AppLogo} alt="App Logo" />
        <h2 id="appName">XPenses</h2>
      </div>
      <div id="headerRight"></div>
    </div>
  );
};

export default Header;
