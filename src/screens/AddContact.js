import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
    Button,
    GradientBackground,
    ImageBackground,
    Input,
    InputAddress,
    Section,
    Text,
    TitleBar
} from '@src/components';
import { connect } from 'react-redux';
import store from '@src/store';
import GlobalStyles from '@src/styles/GlobalStyles';

import { Router } from '@src/Router';
import { IContact } from 'symbol-address-book/IContact';
import { isAddressValid } from '@src/utils/validators';

const styles = StyleSheet.create({
	warning: {
		color: GlobalStyles.color.RED
	}
});

type Props = {
    componentId: string,
    contact: IContact,
};

type State = {};

class AddContact extends Component<Props, State> {
    state = {
        address: '',
        name: '',
        phone: '',
        email: '',
        label: '',
        notes: '',
        update: false,
        isAddressValid: false,
    };

    submit = () => {
        const contact = {
            address: this.state.address,
            name: this.state.name,
            phone: this.state.phone,
            email: this.state.email,
            label: this.state.label,
            notes: this.state.notes,
        };

        store.dispatchAction({ type: 'addressBook/addContact', payload: contact }).then(_ => Router.goBack(this.props.componentId));
    };

    update = id => {
        const contact = {
            address: this.state.address,
            name: this.state.name,
            phone: this.state.phone,
            email: this.state.email,
            label: this.state.label,
            notes: this.state.notes,
            id: id,
        };
        store.dispatchAction({ type: 'addressBook/selectContact', payload: contact });
        store.dispatchAction({ type: 'addressBook/updateContact', payload: contact }).then(_ => Router.goBack(this.props.componentId));
    };

    componentDidMount() {
        const { selectedContact } = this.props;
        if (selectedContact) {
            this.state.update = true;
            this.state.isAddressValid = true;
            this.setState({
                address: selectedContact.address,
                name: selectedContact.name,
                phone: selectedContact.phone,
                email: selectedContact.email,
                label: selectedContact.label,
                notes: selectedContact.notes,
                id: selectedContact.id,
            });
        }
    }

    onAddressChange = address => {
        const { network } = this.props;
        this.setState({ address: address, isAddressValid: isAddressValid(address, network) });
    };

    render() {
        let { address, name, phone, email, label, notes, id, isAddressValid } = this.state;

        return (
            <GradientBackground name="mesh_small" theme="light">
                {!this.state.update && <TitleBar theme="light" onBack={() => Router.goBack(this.props.componentId)} title="Add Contact" />}
                {this.state.update && <TitleBar theme="light" onBack={() => Router.goBack(this.props.componentId)} title="Update Contact" />}
                <Section type="form" isScrollable>
                    <Section type="form-item">
                        <Input value={name} placeholder="Name" theme="light" onChangeText={name => this.setState({ name })} />
                        {name.length === 0 && <Text theme="light" style={styles.warning}>Name is required</Text>}
                    </Section>
                    <Section type="form-item">
                        <InputAddress
                            value={address}
                            placeholder="Address"
                            theme="light"
                            fullWidth
                            onChangeText={address => this.onAddressChange(address)}
                            showAddressBook={false}
                        />
                        {!isAddressValid && <Text theme="light" style={styles.warning}>Invalid address</Text>}
                    </Section>
                    <Section type="form-item">
                        <Input value={phone} placeholder="Phone" theme="light" onChangeText={phone => this.setState({ phone })} />
                    </Section>
                    <Section type="form-item">
                        <Input value={email} placeholder="Email" theme="light" onChangeText={email => this.setState({ email })} />
                    </Section>
                    <Section type="form-item">
                        <Input value={notes} placeholder="Notes" theme="light" onChangeText={notes => this.setState({ notes })} />
                    </Section>
                    {!this.state.update && (
                        <Section type="form-bottom">
							<Section type="button">
                            	<Button text="Add" theme="light" onPress={() => this.submit()} disabled={!isAddressValid && name.length > 0} />
							</Section>
						</Section>
                    )}
                    {this.state.update && (
                        <Section type="form-bottom">
							<Section type="button">
                            	<Button text="Update Contact" theme="light" onPress={() => this.update(id)} disabled={!isAddressValid && name.length > 0} />
							</Section>
						</Section>
                    )}
                </Section>
            </GradientBackground>
        );
    }
}

export default connect(state => ({
    network: state.network.selectedNetwork,
    addressBook: state.addressBook.addressBook,
    selectedContact: state.addressBook.selectedContact,
}))(AddContact);
