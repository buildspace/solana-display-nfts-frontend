import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js"
import { FC, useEffect, useState } from "react"
import styles from "../styles/custom.module.css"

export const FetchNft: FC = () => {

  const [nftData, setNeftData] = useState(null)
  const { connection } = useConnection()
  const { wallet, publicKey } = useWallet()
  const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(wallet))


  const fetchNfts = async () => {

    if (!wallet) {
      alert("Please connect your wallet")
      return
    }


    const nfts = await metaplex
      .nfts()
      .findAllByOwner({ owner: publicKey }).run()


    console.log("Heyoo ",nfts);

    let nftData = []

    for (let i = 0; i < nfts.length; i++) {
      let fetchResult = await fetch(nfts[i].uri)
      let json = await fetchResult.json()
      nftData.push(json)
    }
 
    setNeftData(nftData)
  }
    useEffect(() => {
      fetchNfts()
    }, [wallet])
 
    return (
      <div>
        {nftData && (
          <div className={styles.gridNFT}>
            {nftData.map((nft) => (
              <div>
                <ul>{nft.name}</ul>
                <img src={nft.image} />
              </div>
            ))}
          </div>
        )}
      </div>
    )
  
}
