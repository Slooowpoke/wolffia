import React, {Component} from 'react'
import FieldText from './FieldText'
import FieldRepeating from './FieldRepeating'
import FieldHTML from './FieldHTML'

export function create(name, field, updateBlock){
    if (field.type == 'text') {
        return (<FieldText key={field} field={field} name={name} update={updateBlock}/>)
    } else if (field.type == 'repeating') {
        return (<FieldRepeating field={field} name={name} update={updateBlock} />)
    } else if (field.type == 'html') {
        return (<FieldHTML field={field} name={name} update={updateBlock}/>)
    }
}

export function test(){
    return (
        <p>test</p>
    )
}
