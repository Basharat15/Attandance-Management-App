import  moment from 'moment'
class MarkedAttendence {
    constructor(id,onwerId,Name,attendence,Date){
        this.id= id
        this.onwerId= onwerId
        this.Name=Name
        this.attendence=attendence
        this.Date= Date  
    }
    get readableDate() {
        return moment(this.Date).format('MMMM Do YYYY, hh:mm');
    }
}
export default MarkedAttendence;