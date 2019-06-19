import React from 'react';
import { storiesOf } from '@storybook/react';

import EncryptionBox from '.';

storiesOf('EncryptionBox', module).add('default usage', () => <EncryptionBox isOpen />);
