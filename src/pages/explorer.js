import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import AddIcon from '@atlaskit/icon/glyph/add';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import QuestionsIcon from '@atlaskit/icon/glyph/questions';
import LockFilledIcon from '@atlaskit/icon/glyph/lock-filled';
import WatchIcon from '@atlaskit/icon/glyph/watch';

import apiConfig from '../contents/api.json';
import { RESPONSES_STORAGE_KEY, SETTINGS_STORAGE_KEY } from '../constants/keys';
import Layout from '../components/Layout';
import Explorer from '../components/Explorer';
import Settings from '../components/Settings';
import Sidebar, { Menu, MenuItem } from '../components/Sidebar';
import EncryptionBox from '../components/EncryptionBox';
import SMSBox from '../components/SMSBox';
import FloatingMenu from '../components/FloatingMenu';
import { getMenuItems, injectTemplateData } from '../utils/config';
import useLocalStorage from '../utils/useLocalStorage';
import useTelcoPublicKey from '../utils/useTelcoPublicKey';

const App = {
  ENCRYPTION: 'encryption',
  DECRYPTION: 'decryption',
  SMS: 'smsc_chat',
};

const Wrapper = styled.div`
  display: flex;
  height: calc(100vh - ${Layout.HEADER_HEIGHT}px);
`;

const MainContent = styled.section`
  flex: 1;
  background: #ffffff;
  padding: 20px 22px;
  overflow: auto;
`;

const SettingButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  line-height: 0;
  cursor: pointer;

  span {
    margin-left: 5px;
  }

  &:hover {
    color: #0099e5;
  }
`;

const AppMenu = styled(FloatingMenu)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 900;
`;

function ExplorerPage() {
  const menuItems = getMenuItems(apiConfig);
  const [selectedAPIName, setSelectedAPIName] = useState();
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useLocalStorage(SETTINGS_STORAGE_KEY, {});
  const [apiResponses, setAPIResponses] = useLocalStorage(RESPONSES_STORAGE_KEY, {});
  const [floatingMenuOpen, setFloatingMenuOpen] = useState(false);
  const [openingApp, setOpeningApp] = useState(null);
  const defaultTelcoPublicKey = useTelcoPublicKey();

  useEffect(() => {
    if (!menuItems || !menuItems.length) {
      return;
    }

    const firstItem = menuItems[0].apiName
      ? menuItems[0]
      : menuItems[0].items && menuItems[0].items[0];

    if (firstItem) {
      setSelectedAPIName(firstItem.apiName);
    }
  }, []);

  useEffect(() => {
    if (defaultTelcoPublicKey && !settings.telcoPublicKey) {
      setSettings(value => ({ ...value, telcoPublicKey: defaultTelcoPublicKey }));
    }
  }, [defaultTelcoPublicKey]);

  const getTemplateContext = dependsOn => {
    if (!dependsOn || !dependsOn.length) {
      return {};
    }

    return dependsOn.reduce(
      (context, api) => ({ ...context, [api]: apiResponses[api] && apiResponses[api].data }),
      {}
    );
  };

  const handleSwitchAPI = api => {
    setShowSettings(false);
    setSelectedAPIName(api);
  };

  const handleExplorerSuccess = (api, response) => {
    setAPIResponses(state => ({ ...state, [api]: response }));
  };

  const renderMainContent = () => {
    if (showSettings) {
      return (
        <Settings
          defaultSettings={settings}
          onSave={newSettings => {
            setSettings(newSettings);
            setShowSettings(false);
          }}
        />
      );
    }

    if (!apiConfig || !apiConfig.apis || !apiConfig.apis[selectedAPIName]) {
      return null;
    }
    const selectedAPI = apiConfig.apis[selectedAPIName];
    const baseURL =
      process.env.NODE_ENV === 'development'
        ? '/proxy-api'
        : selectedAPI.baseURL || process.env.GATSBY_API_BASE_URL || apiConfig.baseURL;
    const templateContext = getTemplateContext(selectedAPI.dependsOn);

    return (
      <Explorer
        key={selectedAPIName}
        title={selectedAPI.title}
        description={selectedAPI.description}
        baseURL={baseURL}
        endpoint={selectedAPI.endpoint}
        method={selectedAPI.method}
        defaultParams={injectTemplateData(selectedAPI.parameters, templateContext)}
        defaultHeaders={injectTemplateData(selectedAPI.headers, templateContext)}
        defaultBody={injectTemplateData(selectedAPI.body, templateContext)}
        defaultResponse={apiResponses[selectedAPIName]}
        onSuccess={response => handleExplorerSuccess(selectedAPIName, response)}
      />
    );
  };

  return (
    <Layout docsVersion={`v${apiConfig.version}`} hasDocLink>
      <Wrapper>
        <Sidebar>
          <Sidebar.Body>
            <Menu>
              {menuItems &&
                menuItems.map(item => (
                  <MenuItem
                    key={item.title}
                    selected={item.apiName && selectedAPIName === item.apiName}
                    onClick={item.apiName ? () => handleSwitchAPI(item.apiName) : null}
                  >
                    {item.title}
                    {item.items && item.items.length ? (
                      <Menu>
                        {item.items.map(subItem => (
                          <MenuItem
                            key={subItem.apiName}
                            selected={selectedAPIName === subItem.apiName}
                            onClick={() => handleSwitchAPI(subItem.apiName)}
                          >
                            {subItem.title}
                          </MenuItem>
                        ))}
                      </Menu>
                    ) : null}
                  </MenuItem>
                ))}
            </Menu>
          </Sidebar.Body>
          <Sidebar.Footer>
            <SettingButton onClick={() => setShowSettings(true)}>
              <SettingsIcon size="small" />
              <span>Settings</span>
            </SettingButton>
          </Sidebar.Footer>
        </Sidebar>

        <MainContent>{renderMainContent()}</MainContent>

        <EncryptionBox
          isOpen={openingApp === App.ENCRYPTION}
          mode={openingApp}
          telcoPublicKey={settings && settings.telcoPublicKey}
          clientPrivateKey={settings && settings.clientPrivateKey}
        />

        <EncryptionBox
          isOpen={openingApp === App.DECRYPTION}
          mode={openingApp}
          telcoPublicKey={settings && settings.telcoPublicKey}
          clientPrivateKey={settings && settings.clientPrivateKey}
        />

        <SMSBox
          isOpen={openingApp === App.SMS}
          serviceURL={`${process.env.GATSBY_API_BASE_URL ||
            (apiConfig && apiConfig.baseURL)}/smsc_chat`}
        />

        <AppMenu slideSpeed={500} spacing={8} isOpen={floatingMenuOpen}>
          <FloatingMenu.Trigger
            iconResting={<AddIcon primaryColor="#ffffff" />}
            iconActive={<CrossIcon primaryColor="#ffffff" />}
            background="rgb(48, 71, 236)"
            size={60}
            onClick={() => {
              setFloatingMenuOpen(!floatingMenuOpen);
              if (floatingMenuOpen) {
                setOpeningApp(null);
              }
            }}
          />
          <FloatingMenu.Button
            icon={<LockFilledIcon primaryColor="#ffffff" />}
            background="rgb(48, 71, 236)"
            size={40}
            tooltip="Encryption Tools"
            onClick={() => setOpeningApp(App.ENCRYPTION)}
          />
          <FloatingMenu.Button
            icon={<WatchIcon primaryColor="#ffffff" />}
            background="rgb(48, 71, 236)"
            size={40}
            tooltip="Decryption Tools"
            onClick={() => setOpeningApp(App.DECRYPTION)}
          />
          <FloatingMenu.Button
            icon={<QuestionsIcon primaryColor="#ffffff" />}
            background="rgb(48, 71, 236)"
            size={40}
            tooltip="SMS Tools"
            onClick={() => setOpeningApp(App.SMS)}
          />
        </AppMenu>
      </Wrapper>
    </Layout>
  );
}

export default ExplorerPage;
