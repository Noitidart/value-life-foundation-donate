import React from 'react';
import '../styles/page.css';
import '../styles/donate.css';
import DonateModal from './DonateModal';

import CreditCardPng from './credit-card.png';

class DonatePage extends React.Component {
    state = {
        showModal: false,
        donationMethod: '' // Online, Mail, Wire Transfer, Phone
    };

    handleChooseMethod = (e) => {
        if (e.target.attributes.name) {
            const donationMethod = e.target.attributes.name.value;
            this.setState(() => ({ donationMethod }));
        }
    }

    handleOpenModal = () => {
        this.setState(() => ({ showModal: true }));
    }

    handleCloseModal = () => {
        this.setState(() => ({ donationMethod: undefined, showModal: false}));
    }

    componentDidMount() {
        window.addEventListener('message', (e) => {
            if (e.data && e.data.type === 'contentHeight') {
                var targetFrame = {
                    // prayers: prayersFrame,
                    donations: document.getElementById('donations-frame'),
                    // events: eventsFrame,
                }[e.data.page];
                if (targetFrame) {
                    targetFrame.style.height = e.data.height + 'px';
                }
            }
        });
    }

    render() {
        return (
            <div className="page donate">
                <div
                    className="page__content"
                    style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <h1 className="page__content__header">Donate Now</h1>
                    <iframe
                        id="donations-frame"
                        src="https://themasjidapp.net/masjids/vlf/donations?stylesheetPath=https://noitidart.github.io/value-life-foundation-donate/donations.css"
                        style={{ width: '100%'}}
                        frameborder="0"
                    />
                    <h1 className="page__content__subheader">Other Donation Methods</h1>
                    <form className="options-container" onClick={this.handleChooseMethod}>
                        <a
                            className="icon-container"
                            name="mail"
                            href="http://www.valuelife.org/donatebymail.htm"
                            target="_blank" rel="noopener noreferrer"
                        >
                            <i className="material-icons" name="mail">mail</i>
                            <label name="mail">Mail</label>
                        </a>
                        <div className="icon-container" name="wireTransfer" onClick={this.handleOpenModal}>
                            <i className="material-icons" name="wireTransfer">account_balance</i>
                            <label name="wireTransfer">Wire Transfer</label>
                        </div>
                        <div className="icon-container" name="phone" onClick={this.handleOpenModal}>
                            <i className="material-icons" name="phone">phone</i>
                            <label name="phone">Contact Us</label>
                        </div>
                    </form>
                </div>
                <DonateModal showModal={this.state.showModal} handleCloseModal={this.handleCloseModal} donationMethod={this.state.donationMethod}/>
            </div>
        );
    }
}

export default DonatePage;
