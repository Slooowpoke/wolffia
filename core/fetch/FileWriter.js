import fs from 'fs';
import path from 'path'

export default class FileWriter{

    writeFile(file, name){
        try {
            const reader = fs.createReadStream(file.path);

            const stream = fs.createWriteStream(process.cwd() + '/public/uploads/' + name, {flags: 'a'})
            reader.pipe(stream)
            console.log('uploading %s -> %s', '/uploads/' + name, stream.path)
            return { success: true, path: '/uploads/' + name}
        }catch (error){
            console.log(error)
        }
    }

}