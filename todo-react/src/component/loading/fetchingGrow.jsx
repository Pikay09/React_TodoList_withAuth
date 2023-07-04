import {Spinner} from 'react-bootstrap';

function FethingComp() {
  return (
    <>
    <h2 style={{color:"white"}}>Fetching from server</h2>
      <Spinner animation="grow" size="sm" style={{background:"white"}} />
      <Spinner animation="grow" style={{background:"white"}} />
    </>
  );
}

export default FethingComp;