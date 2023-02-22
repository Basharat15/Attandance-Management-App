import  moment from 'moment'
class AcceptedLeave {
    constructor(id,onwerId,Name,FromDate,ToDate,Remarks,Date){
        this.id= id
        this.onwerId=onwerId
        this.Name=Name
        this.FromDate=FromDate
        this.ToDate=ToDate
        this.Remarks=Remarks
        this.Date= Date  
    }
    get readableDate() {
        return moment(this.Date).format('MMMM Do YYYY, hh:mm');
    }
}
export default AcceptedLeave;