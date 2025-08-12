class calculator{
    constructor(prevoptext, curroptext){
        this.prevoptext = prevoptext
        this.curroptext = curroptext
        this.clear()
    }

    clear(){
        this.currop = ''
        this.prevop = ''
        this.operation = undefined
    }

    delete(){
        this.currop = this.currop.toString().slice(0, -1)
    }

    addNum(number){
        if(number === '.' && this.currop.includes('.')) return
        this.currop = this.currop.toString() + number.toString()
    }

    addOp(operation){
        if (this.currop === '') return

        if(this.prevop !== '' ){
            this.compute()
        }

        this.operation = operation
        this.prevop = this.currop.toString() + ' ' + operation.toString()
        this.currop = ''

    }

    compute(){
        const prev = parseFloat(this.prevop)
        const curr = parseFloat(this.currop)
        let result

        if(this.currop === '' || this.prevop === '') return

        switch (this.operation){
            case '+':
                result = curr + prev
                break
            
            case '-':
                result = prev - curr
                break 
           
            case '*':
                result = curr * prev
                break
            
            case '÷':
                result = prev / curr
                break
            
            default:
                return
        }
        this.prevop = ''
        this.currop = result
    
    }

    update(){
        this.curroptext.innerText = this.currop
        this.prevoptext.innerText = this.prevop
    }
}    



const numbutton = document.querySelectorAll('[data-number]')
const opbutton = document.querySelectorAll('[data-operation]')
const delbutton = document.querySelector('[data-delete]')
const equalbutton = document.querySelector('[data-equal]')
const clearbutton = document.querySelector('[data-clear]')
const prevoptext = document.querySelector('[data-prev]')
const curroptext = document.querySelector('[data-curr]')

const Calculator = new calculator(prevoptext, curroptext)

numbutton.forEach(button => {
    button.addEventListener('click', () => {
        Calculator.addNum(button.innerText)
        Calculator.update()
    })
})

opbutton.forEach(button => {
    button.addEventListener('click', () => {
        Calculator.addOp(button.innerText)
        Calculator.update()
    })
})

equalbutton.addEventListener('click', () => {
        Calculator.compute()
        Calculator.update()
    })

clearbutton.addEventListener('click', () => {
    Calculator.clear()
    Calculator.update()
})

delbutton.addEventListener('click', () => {
    Calculator.delete()
    Calculator.update()
})