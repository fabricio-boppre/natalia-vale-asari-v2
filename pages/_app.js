import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import App from 'next/app';
import Head from 'next/head';
import Image from 'next/image';
import Router from 'next/router';
import HeadRss from '../components/HeadRss.js';
import Header from '../components/Header.js';
import NavigationList from '../components/NavigationList.js';
import LanguagesList from '../components/LanguagesList.js';
import Contact from '../components/Contact.js';
import '../styles/reset-min.css';
import '../styles/globals.css';

// Custom App: https://nextjs.org/docs/advanced-features/custom-app
// - The Component prop is the active page, so whenever you navigate between routes, Component will change to the new page. Therefore, any props you send to Component will be received by the page;
// - pageProps is an object with the initial props that were preloaded for your page by one of our data fetching methods, otherwise it's an empty object.
export default class NataliaValeAsariWebsite extends App {

	// Initial State:
  state = {fullScreenMenu: 'off'}

	// Methods: 
	// - Arrow functions make .bind method calls in the constructor unnecessary;
	// - (Because they lexically bind their context so this actually refers to the originating context; that’s called Lexical Scoping.)
	// - https://www.taniarascia.com/es6-syntax-and-feature-overview/#arrow-functions
	// - https://medium.com/@nikolalsvk/loosing-bind-this-in-react-8637ebf372cf

  // Methods that open or close the full screen menu:
	openFullScreenMenu = () => { this.setState({fullScreenMenu: 'on'}) }
	closeFullScreenMenu = () => { this.setState({fullScreenMenu: 'off'}) }
  
  render() {

    const { Component, pageProps } = this.props;

    // Closing the menu if it's open during a route change:
    if (this.state.fullScreenMenu == 'on') {
      Router.events.on('routeChangeComplete', (this.closeFullScreenMenu));
    }

    return (

      <main id="page-wrap">

        <Head>
          <title>Dr Natalia Vale Asari</title>
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,300;0,600;1,300;1,600&display=swap" />
          <script src="/js/modernizr-custom.js"></script>
        </Head>

        <HeadRss />
        
        <div id="main" className={this.state.fullScreenMenu === 'off' ? 'on' : 'off'}>
        
          <Header openFullScreenMenu={this.openFullScreenMenu} />
  
          <section id="content">
            <Component {...pageProps} />
          </section>
                  
        </div>

        <div id="sidebar" className={this.state.fullScreenMenu === 'off' ? 'on' : 'off'}>
          
          <Image
            src="/img/layout/natalia_pic.jpg"
            alt="Dr Natalia Vale Asari"
            width={220}
            height={220}
          />
  
          <div id="sidebar_text">

            <NavigationList />
            <hr />
            <Contact />
          
          </div>
            
        </div>

        <div id="full-screen-menu" className={this.state.fullScreenMenu === 'off' ? 'off' : 'on'} >

          <div id="buttons">
            <button id="close_menu" 
                    onClick={this.closeFullScreenMenu}>
              <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
               <g>
                <line transform="rotate(90 15 14.9687)" id="svg_10" y2="28.33792" x2="28.41136" y1="1.59958" x1="1.58864" strokeWidth="4" />
                <line transform="rotate(0.00411461 15 14.9688)" id="svg_11" y2="28.33792" x2="28.41136" y1="1.59958" x1="1.58864" strokeWidth="4" />
               </g>
              </svg>
            </button>
          </div>
                  
          <LanguagesList />
          <hr />
          <NavigationList />
          <hr />
          <Contact />
          
        </div>
        
      </main>
    );
    
  }
}