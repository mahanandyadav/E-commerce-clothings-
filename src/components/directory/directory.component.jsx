import DirectoryItem from '../directory-item/directory-item.component';

import { DirectoryContainer } from './directory.styles';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import { useEffect, useState,useRef } from 'react';

const categories = [
  {
    id: 1,
    title: 'hats',
    imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
    route: 'shop/hats',
  },
  {
    id: 2,
    title: 'jackets',
    imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
    route: 'shop/jackets',
  },
  {
    id: 3,
    title: 'sneakers',
    imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
    route: 'shop/sneakers',
  },
  {
    id: 4,
    title: 'womens',
    imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
    route: 'shop/womens',
  },
  {
    id: 5,
    title: 'mens',
    imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
    route: 'shop/mens',
  },
];

const step = [
  {
    target:'.logo',
    title:'Home',
    disableOverlayClose: true,
    content:<p>Welcome!! This is your home page</p>,
    floaterProps: {
      disableAnimation: false,
    },
  },
  {
    target:'.shop',
    title:'Shop',
    disableOverlayClose: true,
    content:<p>Way to detail view of various categories </p>,
    floaterProps: {
      disableAnimation: false,
    },
  },

  {
    target:'.cart',
    spotlightClicks: false,
    title:'cart',
    placement: 'bottom',
    disableOverlayClose: true,
    content:"click  here to open cart",
    style:{
      options: {
        width: 30000,
      },
    }
  },
  
  {
    target:'.hats',
    title:'Hats',
    placement: 'bottom',
    disableOverlayClose: true,
    content:"All hats off for osm you",
    spotlightPadding: 4,
    style:{
      options: {

      },
    }
  },
  {
    target:'.jackets',
    title:'Jackets',
    placement: 'bottom',
    disableOverlayClose: true,
    content:"Checkout cool jackets and various other collections",
    spotlightPadding: 4,
    style:{
      options: {

      },
    }
  },
  {
    target:'.sign_in',
    title:'login',
    disableOverlayClose: true,
    placement: 'bottom',
    content:"Navigate to login page, you can login using google account or Sign up with you e-mail",
    style:{
      options: {
        width: 30000,
      },
    }

  },
  
]


const Directory = () => {
  const [run, setRun] = useState(false)

  console.log(window)
if(window.location.hash.length===4){
  setRun(true)
}
  window.location.hash+='#mny'

  const [steps, setSteps] = useState(step)
  const handleJoyrideCallback = (data) => {
    const { status, type } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];
  
    if (finishedStatuses.includes(status)) {
      setRun(false)
    }
  
  };


  return (
    <DirectoryContainer>
       <Joyride
        callback={handleJoyrideCallback}
        continuous
        hideBackButton={false}
        hideCloseButton
        run={run}
        scrollToFirstStep
        showProgress
        showSkipButton
        disableOverlay={false}
        steps={steps}
        
        styles={{
          options: {
            // zIndex: 10000,
            // backgroundColor: 'blue',
            overlayColor: 'rgba(0, 0, 0, 0.8)',
            primaryColor: 'red',
          },
        }}
      />

      {categories.map((category) => (
        <DirectoryItem key={category.id} category={category} />
      ))}
    </DirectoryContainer>
  );
};

export default Directory;
