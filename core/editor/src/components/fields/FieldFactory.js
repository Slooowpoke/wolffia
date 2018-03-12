import React, {Component} from 'react'
import FieldText from './FieldText'
import FieldRepeating from './FieldRepeating'
import FieldHTML from './FieldHTML'
import FieldImage from './FieldImage'
import MediaPicker from '../media/MediaPicker'

export function create(name, field, updateBlock, index){
    if (field.type === 'text') {
        return (<FieldText key={field} field={field} name={name} update={updateBlock} index={index}/>)
    } else if (field.type === 'repeating') {
        return (<FieldRepeating key={name} field={field} name={name} update={updateBlock} index={index}/>)
    } else if (field.type === 'html') {
        return (<FieldHTML key={name} field={field} name={name} update={updateBlock} index={index}/>)
    } else if (field.type === 'image') {
        return (<MediaPicker key={name} field={field} name={name} update={updateBlock} index={index}/>)
    }
}
