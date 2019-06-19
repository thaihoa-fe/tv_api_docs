import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Settings from '.';

storiesOf('Settings', module).add('default usage', () => <Settings onSave={action('save')} />);
