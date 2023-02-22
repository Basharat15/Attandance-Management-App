import  moment from 'moment'
class Leave {
    constructor(id,onwerId,Name,FromDate,ToDate,Date){
        this.id= id
        this.onwerId=onwerId
        this.Name=Name
        this.FromDate=FromDate
        this.ToDate=ToDate
        this.Date= Date  
    }
    get readableDate() {
        return moment(this.Date).format('MMMM Do YYYY, hh:mm');
    }
}
export default Leave;