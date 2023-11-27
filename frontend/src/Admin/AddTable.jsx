import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {storage} from '../firebase'
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"

const schema = yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
    imageurl: yup.mixed()
})

function AddTable() { 
    const onSubmit= async(data)=>{
      const { name, description, imageurl } = data;

      const imageFile = imageurl[0];
      const imageRef= ref(storage, `images${imageFile.name}`)  
      await uploadBytes(imageRef ,imageFile).then(()=>{
            alert('image uploaded')
          })
          
            

          const images = await getDownloadURL(imageRef);
          const productData = {
              name,
              description,
              images,
            };
            console.log(images)
    }
    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(schema)

    });

  return (
    <div className="addProduct-form-container">
    <form className='product-form' onSubmit={handleSubmit(onSubmit)}>
        <h2 className='fade-in' >Add table here</h2>
        <input placeholder="name" {...register('name')} />
        {errors.name && <p>{errors.name.message}</p>}
        <textarea placeholder="description" {...register('description')}></textarea>
        <input type='file' placeholder='images'{...register('imageurl')}/>
        {errors.imageurl && <p>{errors.imageurl.message}</p>}
        <button type='submit'>add </button>
    </form>

   
</div>
  )
}

export default AddTable