import { gql, useQuery } from "@apollo/client"
import { useCart } from "react-use-cart"


const COLLECTIONS_GQL = gql`
  query collections {
    products(first: 10, channel: "default-channel") {
      edges {
        node {
          id
          name
          thumbnail(size: 100) {
            url
          }
          media {
            type
            url(size: 100)
          }

          pricing {
            priceRange {
              start {
                gross {
                  amount
                  currency
                }
              }
            }
          }
        }
      }
    }
  }
`



const Collection = (item) => {
  const { addItem } = useCart()
  const { id, name, thumbnail, pricing } = item
  const [source] = thumbnail
  const { amount, currency } = pricing.priceRange.start.gross

  const onClick = () => {
    addItem({ id, name, thumbnail, price: amount, currency}, 1)
  }

  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      <figure><img src={source.url} alt="Shoes" /></figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={onClick}>Buy Now</button>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const { loading, error, data } = useQuery(COLLECTIONS_GQL)

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }

  const { edges } = data.products

  return (
    <div className="grid justify-items-center">
      {edges.map(Collection)}
    </div>
  )
}
