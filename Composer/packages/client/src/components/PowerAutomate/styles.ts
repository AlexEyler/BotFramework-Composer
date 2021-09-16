// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { SharedColors } from '@uifabric/fluent-theme';

export const buttonStyles: IButtonStyles = {
  root: { outline: '1px solid transparent', padding: '0 8px', textAlign: 'left' },
  rootFocused: {
    outlineWidth: '0px',
    border: `1px solid ${SharedColors.cyanBlue10}`,
    selectors: {
      '::after': {
        content: '',
        // need to use !important to override global focus class specificity
        border: `1px solid ${SharedColors.cyanBlue10} !important`,
        outline: 'none !important',
        inset: '0 !important',
      },
    },
  },
  rootHovered: { backgroundColor: 'initial' },
  rootPressed: {
    backgroundColor: 'initial',
    outlineWidth: '0px',
    border: `1px solid ${SharedColors.cyanBlue10}`,
    selectors: {
      '::after': {
        content: '',
        // need to use !important to override global focus class specificity
        border: `1px solid ${SharedColors.cyanBlue10} !important`,
        outline: 'none !important',
        inset: '0 !important',
      },
    },
  },
  rootChecked: { backgroundColor: 'initial' },
  rootExpanded: { backgroundColor: 'initial' },
  rootExpandedHovered: { backgroundColor: 'initial' },
  flexContainer: { justifyContent: 'space-between' },
  label: { margin: '0', fontWeight: 'normal' },
};
