const Header = () => {
  const logo = new URL("../assets/images/AppLogo.png", import.meta.url);

  return (
    <div id="header">
      <div id="leftSide">
        <img id="appLogo" src={logo} alt="App Logo" />
        <h2 id="appName">XPenses</h2>
      </div>
      <div id="headerRight"></div>
    </div>
  );
};

export default Header;
