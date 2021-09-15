// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** @jsx jsx */
import { WidgetComponent, WidgetContainerProps } from '@bfc/extension-client';
import { jsx } from '@emotion/core';
import React from 'react';

export interface PowerAutomateRefProps extends WidgetContainerProps {
  flow: string;
}

export const PowerAutomateRef: WidgetComponent<PowerAutomateRefProps> = ({ id, onEvent, data }) => {
  return (
    <div>
      <span>Hello world</span>
    </div>
  );
};
