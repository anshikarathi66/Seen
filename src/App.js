// import React , { useState, useEffect }from 'react';
// import { create } from 'ipfs-http-client';
// import './App.css';
// import Web3 from 'web3';
// import Heading from './components/heading.js';
// import Upload from './components/upload.js';
// import Checkfeed from './components/checkfeed.js';
// import Navbar from './components/navbar.js';
// import seenpageabi from './seenpage.json';

// //Declare IPFS
// const ipfs = create(new URL('http://127.0.0.1:5001'))

// function App() {
//   const [account, setAccount] = useState('')
//   const [seenpage, setseenpage] = useState(null)
//   const [imagesCount, setImagesCount] = useState(0)
//   const [images, setImages] = useState([])
//   const [buffer, setBuffer] = useState(null)

//     // To Call loadweb3 and loadblockchaindata
//     useEffect(() => {
//       async function fetchData() { //create another function fetchdata() which will be called first and then it'll call required functions
//         await loadWeb3()
//         await loadBlockchainData()
//       }
//       fetchData()
//     }, [])
 
//   //By creating a new instance of the Web3 library, your application can make use of all the functions
//   //and methods provided by Web3 to interact with the Ethereum network.
//   async function loadWeb3() {
//     //checks for the presence of an Ethereum provider in the user's browser, such as MetaMask
//     if (window.ethereum) {
//       //initializes a new instance of the Web3 library
//       window.web3 = new Web3(window.ethereum)
//       await window.ethereum.enable()
//     }
//     //checking if an older version of the Web3 library is already loaded in the user's browser
//     else if (window.web3) {
//       //setting window.web3 to use that instance's current provider
//       window.web3 = new Web3(window.web3.currentProvider)
//     }
//     //if none found
//     else {
//       window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
//     }
//   }

// // Create an instance of the Web3 class
// const web3 = new Web3('https://eth-goerli.g.alchemy.com/v2/7U58sYyQBXUb1NxZGDV-aUZfY7Nk61Ld');
//   async function loadBlockchainData() {
    
//     const accounts = await web3.eth.getAccounts() //this will give all the accounts in metamask in form of array
//     setAccount(accounts[0]) //this will select first account in array

//     //create an instance of our smart contract so that backend info can be used in front end

//       // Load the contract ABI and address
//       const contractAddress = '0x50904b245b5295a9dda21916b5be287d83ac9714';
//       const contractABI = seenpage.abi;

//       // Create an instance of the Contract class
//       const seenpage = new web3.eth.Contract(contractABI, contractAddress);
//       setseenpage(seenpage);

//       const imagesCount = await seenpage.methods.imageCount().call();
//       setImagesCount(imagesCount);

//       // Load images
//       for (var i = 1; i <= imagesCount; i++) {
//         const image = await seenpage.methods.images(i).call()
//         setImages(prevState => [...prevState, image])
//       }
//       // Sort images. Show highest tipped images first
//       setImages(prevState => prevState.sort((a, b) => b.tipAmount - a.tipAmount))
//   }

//   //to read the image uploaded by user
//   function captureFile(event) {
//     event.preventDefault()
//     //read the file of a html element
//     const file = event.target.files[0]
//     //it is a native window filereader from javascript
//     const reader = new window.FileReader()
//     //read it as an array buffer
//     reader.readAsArrayBuffer(file)

//     //convert the file into a format that IPFS accepts
//     reader.onloadend = () => {
//       setBuffer(Buffer.from(reader.result)) //.from
//       console.log('buffer', buffer)
//     }
//   }

//   function uploadImage(description){
//     console.log("Submitting file to ipfs...")

//     //adding file to the IPFS
//     ipfs.add(buffer, (error, result) => {
//       console.log('Ipfs result', result)
//       if(error) {
//         console.error(error)
//         return
//       }

      
//       seenpage.methods.uploadImage(result[0].hash, description).send({ from: account }).on('transactionHash', (hash) => {
        
//       })
//     })
//   }

//   function tipImageOwner(id, tipAmount) {
    
//     seenpage.methods.tipImageOwner(id).send({ from: account, value: tipAmount }).on('transactionHash', (hash) => {
      
//     })
//     }


//   return (
//     <React.Fragment>
//       <Navbar account={account} />
//       <Heading/>
//       <Upload 
//         captureFile={captureFile}
//         uploadImage={uploadImage}
//       />
//       <Checkfeed
//             images={images}
//             tipImageOwner={tipImageOwner}
//           />
//     </React.Fragment>
//   );
// }

// export default App;





import seenpageabi from './seenpage.json';
import React, { Component } from 'react';
import Identicon from 'identicon.js';
import { create } from 'ipfs-http-client';
import Heading from './components/heading.js';
import Upload from './components/upload.js';
import Checkfeed from './components/checkfeed.js';
import Navbar from './components/navbar.js';
import Web3 from 'web3';
import './App.css';
import { Buffer } from 'buffer';


// //Declare IPFS
// const ipfsClient = require('ipfs-http-client')
// const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values
const ipfs = create(new URL('http://127.0.0.1:5001'))

class App extends Component {

  async componentDidMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    // // Network ID
    // const networkId = await web3.eth.net.getId()
    // const networkData = seenpage.networks[networkId]
    const contractAddress = '0x50904b245b5295a9dda21916b5be287d83ac9714';
    const contractABI = seenpage.abi;
    
          // Create an instance of the Contract class
          // const seenpage = new web3.eth.Contract(contractABI, contractAddress);
          // setseenpage(seenpage);
    // if(networkData) {
      const seenpage = new web3.eth.Contract(contractABI, contractAddress)
      this.setState({ seenpage })
      const imagesCount = await seenpage.methods.imageCount().call()
      this.setState({ imagesCount })
      // Load images
      for (var i = 1; i <= imagesCount; i++) {
        const image = await seenpage.methods.images(i).call()
        this.setState({
          images: [...this.state.images, image]
        })
      }
      // Sort images. Show highest tipped images first
      this.setState({
        images: this.state.images.sort((a,b) => b.tipAmount - a.tipAmount )
      })
      this.setState({ loading: false})
    // } else {
    //   window.alert('seenpage contract not deployed to detected network.')
    // }
  }

  captureFile = event => {

    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)

    reader.onloadend = () => {
      this.setState({ buffer: Buffer.from(reader.result) }, () => {
        console.log('buffer', this.state.buffer)
      })
    }
  }

  uploadImage = description => {
    console.log("Submitting file to ipfs...")

    //adding file to the IPFS
    ipfs.add(this.state.buffer, (error, result) => {
      console.log('Ipfs result', result)
      if(error) {
        console.error(error)
        return
      }

      this.setState({ loading: true })
      this.state.seenpage.methods.uploadImage(result[0].hash, description).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
    })
  }

  tipImageOwner(id, tipAmount) {
    this.setState({ loading: true })
    this.state.seenpage.methods.tipImageOwner(id).send({ from: this.state.account, value: tipAmount }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      seenpage: null,
      images: [],
      loading: true
    }

    this.uploadImage = this.uploadImage.bind(this)
    this.tipImageOwner = this.tipImageOwner.bind(this)
    this.captureFile = this.captureFile.bind(this)
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
       <Heading/>
       <Upload 
         captureFile={this.captureFile}
         uploadImage={this.uploadImage}
       />
       <Checkfeed
             images={this.state.images}
             tipImageOwner={this.tipImageOwner}
           />
      </div>
    );
  }
}

export default App;
