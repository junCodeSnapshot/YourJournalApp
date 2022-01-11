import { fileUpload } from "../../helpers/fileUpload"
import cloudinary from 'cloudinary'

cloudinary.config({ 
    cloud_name: 'juncodeglitch', 
    api_key: '828178939942436', 
    api_secret: '6QffC6m5q01q7DYLIbkvSoXG018',
    secure: true
  });

describe('Test on fileUpload', () => {
    const landscape = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Campbell_Island_Landscape.jpg/800px-Campbell_Island_Landscape.jpg'

    test('should load a file and return the URL', async() => {
        const resp = await fetch(landscape)    
        const blob = await resp.blob()
        const file = new File([blob], 'foto.jpg')
        const url = await fileUpload(file)
        
        expect(typeof url).toBe('string');

        //Borrar imagen por ID
        const segments = url.split('/')
        const imageId = segments[segments.length - 1].replace('.jpg', '')

        cloudinary.v2.api.delete_resources(imageId);
    })

    test('should return an err', async() => {
        const file = new File([], 'foto.png')
        const url = await fileUpload(file)
        expect(url).toBe(null)
    })
    
    
})
