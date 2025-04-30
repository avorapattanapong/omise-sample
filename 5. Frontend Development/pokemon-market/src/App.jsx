
import './App.css'
import {ConfigProvider} from "antd";
import HomePage from "./components/HomePage.jsx";
import MainLayout from "./components/MainLayout.jsx";

function App() {

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#ea7c69',         // brand primary
          colorBgBase: '#252836',           // body background color
          colorTextBase: '#ffffff',         // base text color
          colorBorderSecondary: '#444',     // softer borders
          fontFamily: 'Poppins, sans-serif',// font family
          borderRadius: 8,                  // default rounded corners
        },
        components: {
          Button: {
            colorPrimaryHover: '#f5a191',   // lighter hover color
            colorBgElevated: '#2e303e',      // elevated button background
          },
          Card: {
            paddingLG: 24,                  // larger card padding
            borderRadiusLG: 12,              // rounded card
          },
          Input: {
            colorBgContainer: '#2e303e',     // dark background input
          },
        }
      }}
    >
      <MainLayout>
        <HomePage />
      </MainLayout>
    </ConfigProvider>
  )
}

export default App
