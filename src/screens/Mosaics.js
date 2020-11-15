import React, { Component } from 'react';
import { StyleSheet, } from 'react-native';
import { Section, ImageBackground, GradientBackground, TitleBar, MosaicDisplay } from '@src/components';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
});

type Props = {
    componentId: string,
};

type State = {};

class Mosaics extends Component<Props, State> {
    state = {};

    render() {
        const { ownedMosaics, onOpenMenu, onOpenSettings  } = this.props;
        const {} = this.state;

        return (
            //<ImageBackground name="blue" fade={true}>
				<GradientBackground name="connector_small" theme="light">

				
                <TitleBar 
					theme="light"
					title="Mosaics" 
					onOpenMenu={() => onOpenMenu()} 
					onSettings={() => onOpenSettings()}
				/>
                <Section type="list" style={styles.list} isScrollable>
                    {ownedMosaics &&
                        ownedMosaics.map(mosaic => {
                            return <MosaicDisplay mosaic={mosaic} />;
                        })}
                </Section>
			</GradientBackground>
			//</ImageBackground>
        );
    }
}

export default connect(state => ({
    ownedMosaics: state.account.ownedMosaics,
}))(Mosaics);
