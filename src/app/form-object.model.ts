//that guid how to use json to create fields
export class FormObject {
    title?: string;
    fields: [
        //that used with field in type lable
        Label:{
            id: string,
            type: string,
            label: string
        },
        //that used with field in type textbox
        Textbox:{
            id: string,
            type: string, //should = Textbox
            label: string,
            inputType: string, //can "text" or "email" or "password"
            value?: string, //used when you need set value with creation form  
            placeholder?: string,
            Required?: boolean //set validation required on the field
        },
        //that used with dropdown field
        Dropdown:{
            id: string,
            type: string, //should = Dropdown
            label: string,
            value?: string, //used when you need set value with creation form  
            placeholder?: string,
            Required?: boolean,
            options: [string]
        },
        Checkbox:{
            id: string,
            label: string,
            type: string, //should = "Checkbox"
            options: [
                {
                    label: string,
                    value: string,
                    checked: boolean //used if you need field is checked or not with creation form
                }
            ]
        },
        RadioButton:{
            id: string,
            label: string,
            type: string, //should = "RadioButton"
            value?: string,
            Required?: boolean,
            options: [
                {
                    label: string,
                    value: string
                }
            ]
        },
        Cancel:{
            id: string,
            type: string, //shoud = "Cancel"
            value: string //name that render on the button
        },
        Submit:{
            id: string,
            type: string, //should = "Submit"
            value: string //name that render on the button
        }
    ]
}
