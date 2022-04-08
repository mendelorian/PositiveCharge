import React, { useState } from 'react';

const PriceFilter = ({ priceModalState, setPriceModalState, managePriceModalState}) => {

  const prices = {
    free: '',
    $: '',
    $$: '',
    $$$: ''
  }

  const [price, setPrice] = useState(prices);
  const handlePrice = (e) => {
    console.log('hel')
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setPrice( { ...price, [name]: value } );
  }



  return (
    <>
      { priceModalState ?
        <div>
            <form className='priceFilterModal'>

              <div className='ckButton'>
                <label>
                  <input type='checkbox' name='free' checked={price.free} onChange={ handlePrice } />
                  <span>Free</span>
                </label>
              </div>

              <div className='ckButton'>
                <label>
                  <input type='checkbox' name='$' checked={price.$} onChange={ handlePrice } />
                  <span>$</span>
                </label>
              </div>

              <div className='ckButton'>
                <label>
                  <input type='checkbox' name='$$' checked={price.$$} onChange={ handlePrice }  />
                  <span>$$</span>
                </label>
              </div>

              <div className='ckButton'>
                <label>
                  <input type='checkbox' name='$$$' checked={price.$$$} onChange={ handlePrice }  />
                  <span>$$$</span>
                </label>
              </div>

              <input type='submit' value='Save'/>
            </form>
        </div>

      : null }
    </>
  )
}

export default PriceFilter;

