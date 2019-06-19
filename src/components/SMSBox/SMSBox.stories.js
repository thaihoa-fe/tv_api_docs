import React from 'react';
import { storiesOf } from '@storybook/react';

import SMSBox from '.';

storiesOf('SMSBox', module).add('default usage', () => (
  <SMSBox serviceURL="http://testing-api.trustingsocial.com/smsc_chat" isOpen />
));
