import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import AddIcon from '@atlaskit/icon/glyph/add';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import QuestionsIcon from '@atlaskit/icon/glyph/questions';
import UnlockFilledIcon from '@atlaskit/icon/glyph/unlock-filled';

import FloatingMenu from '.';

function Demo() {
  const [isOpen, setOpen] = useState(false);

  return (
    <FloatingMenu slideSpeed={500} spacing={8} isOpen={isOpen}>
      <FloatingMenu.Trigger
        iconResting={<AddIcon primaryColor="#ffffff" />}
        iconActive={<CrossIcon primaryColor="#ffffff" />}
        background="rgb(48, 71, 236)"
        size={60}
        onClick={() => setOpen(!isOpen)}
      />
      <FloatingMenu.Button
        icon={<QuestionsIcon primaryColor="#ffffff" />}
        background="rgb(48, 71, 236)"
        size={40}
        tooltip="SMS"
        onClick={action('smsc-chat-click')}
      />
      <FloatingMenu.Button
        icon={<UnlockFilledIcon primaryColor="#ffffff" />}
        background="rgb(48, 71, 236)"
        size={40}
        tooltip="Encryption Tools"
        onClick={action('encryption-box-click')}
      />
    </FloatingMenu>
  );
}

storiesOf('FloatingMenu', module).add('default usage', () => <Demo />);
