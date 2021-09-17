// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SchemaField } from '@bfc/adaptive-form';
import { FieldProps, JSONSchema7, UIOptions } from '@bfc/extension-client';
import React, { useMemo } from 'react';

import { PowerAutomateFlow } from './PowerAutomateFlow';

const toExpressionVariableRef = (variableType: string) => {
  switch (variableType) {
    case 'boolean':
      return '#/definitions/condition';
    case 'string':
      return '#/definitions/stringExpression';
    case 'number':
      return '#/definitions/numberExpression';
    default:
      return variableType;
  }
};

interface PowerAutomateParameterFieldProps extends FieldProps {
  flow?: PowerAutomateFlow;
}

const PowerAutomateParameterFieldMenu: React.FC<PowerAutomateParameterFieldProps> = (props) => {
  const { definitions, id, flow, onChange, value, uiOptions } = props;

  const isInput = uiOptions.properties?.input ?? true;

  const properties = useMemo(() => {
    if (isInput) {
      return flow?.inputProperties;
    }

    return flow?.outputProperties;
  }, [flow]);

  if (!properties) {
    return <div />;
  }

  return (
    <React.Fragment>
      {properties.map((p, i) => {
        const propSchema: JSONSchema7 = {
          $ref: toExpressionVariableRef(p.valueType),
        };
        const propUiOptions: UIOptions = {
          label: p.name,
        };
        const change = (item: string) => {
          if (isInput) {
            const newParameters = {
              ...value.inputParameters,
              [p.name]: item,
            };
            onChange({ ...value, inputParameters: newParameters });
          } else {
            const newOutputProperties = {
              ...value.outputProperties,
              [p.name]: item,
            };
            onChange({ ...value, outputProperties: newOutputProperties });
          }
        };
        const getValue = () => {
          if (isInput) {
            return value.inputParameters ? value.inputParameters[p.name] ?? '' : '';
          } else {
            return value.outputProperties ? value.outputProperties[p.name] ?? '' : '';
          }
        };
        return (
          <SchemaField
            key={p.name}
            required
            definitions={definitions}
            id={`${id}_${i}`}
            name={p.name}
            schema={propSchema}
            uiOptions={propUiOptions}
            value={getValue()}
            onChange={change}
          />
        );
      })}
    </React.Fragment>
  );
};

export const PowerAutomateParameterField: React.FC<FieldProps> = (props) => {
  return <PowerAutomateParameterFieldMenu {...props} flow={props.value?.flow}></PowerAutomateParameterFieldMenu>;
};
