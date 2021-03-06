import { Button, Icon, Link, Text } from 'blockchain-info-components'
import { equals, isNil, or, path } from 'ramda'
import { Field, reduxForm } from 'redux-form'
import { FormattedMessage } from 'react-intl'
import React from 'react'
import styled from 'styled-components'

import {
  CancelWrapper,
  ColLeft,
  ColRight,
  ColRightInner,
  Form,
  InputWrapper,
  PartnerHeader,
  PartnerSubHeader,
  Row
} from 'components/IdentityVerification'
import { RadioButton } from 'components/Form'
import { SellContainer } from 'components/BuySell/styled'
import { spacing } from 'services/StyleService'
import { StepTransition } from 'components/Utilities/Stepper'

const RowContent = styled(Row)`
  padding-left: 10px;
  justify-content: space-between;
`
const ClickableIcon = styled(Icon)`
  cursor: pointer;
`
const BankLabel = styled.label``
const CenteredRow = styled(Row)`
  align-items: center;
`

const SelectAccounts = props => {
  const {
    invalid,
    submitting,
    bankAccounts,
    setBankAccount,
    deleteBankAccount,
    radioButtonSelected
  } = props
  const noRadioButtonSelected = or(
    isNil(radioButtonSelected),
    equals(radioButtonSelected, '')
  )

  return (
    <Form>
      <ColLeft>
        <SellContainer>
          <InputWrapper style={spacing('mb-40')}>
            <PartnerHeader>
              <FormattedMessage
                id='coinifyexchangedata.selectaccounts.header'
                defaultMessage='Select Account'
              />
            </PartnerHeader>
            <PartnerSubHeader>
              <FormattedMessage
                id='coinifyexchangedata.selectaccounts.subheader'
                defaultMessage='Where would you like your funds sent? You have the following bank accounts linked: '
              />
            </PartnerSubHeader>
          </InputWrapper>
          {bankAccounts &&
            bankAccounts.map((b, index) => (
              <CenteredRow key={index}>
                <Field
                  name='iban'
                  component={RadioButton}
                  props={{ id: `iban${index}`, value: index }}
                />
                <RowContent>
                  <BankLabel htmlFor={`iban${index}`}>
                    <Text weight={400}>{path(['_account', '_number'], b)}</Text>
                  </BankLabel>
                  <ClickableIcon
                    name='trash'
                    onClick={() => deleteBankAccount(b)}
                  />
                </RowContent>
              </CenteredRow>
            ))}
          <StepTransition
            next
            Component={Button}
            style={spacing('mt-45')}
            nature='light'
            fullwidth
            disabled={submitting || invalid}
          >
            <FormattedMessage
              id='coinifyexchangedata.selectaccounts.addaccount'
              defaultMessage='Add new account'
            />
          </StepTransition>
        </SellContainer>
      </ColLeft>
      <ColRight>
        <ColRightInner>
          <StepTransition
            to={4}
            Component={Button}
            style={spacing('mt-45')}
            nature='primary'
            onClick={setBankAccount}
            fullwidth
            disabled={submitting || invalid || noRadioButtonSelected}
          >
            <FormattedMessage
              id='coinifyexchangedata.selectaccounts.continue'
              defaultMessage='Continue'
            />
          </StepTransition>
          <CancelWrapper>
            <StepTransition prev Component={Link}>
              <FormattedMessage
                id='coinifyexchangedata.selectaccounts.back'
                defaultMessage='Back'
              />
            </StepTransition>
          </CancelWrapper>
        </ColRightInner>
      </ColRight>
    </Form>
  )
}

export default reduxForm({ form: 'radioButtonSelected' })(SelectAccounts)
