import React from 'react';
import  './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange,onSubmit}) =>{


    return(
        <div>
            <p>
                {'This magic brain will detect the faces in your pictures!'}

            </p>
            <div className='center'>
                <div className='center form pa4 br3 shadow-5'>
                <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}/>
                <button className='w-30 grow f4 link ph3 pv2 dib bg-light-red' onClick={onSubmit}>Detect
                </button>
            </div>
            </div>
        </div>



    );
}


export default ImageLinkForm;