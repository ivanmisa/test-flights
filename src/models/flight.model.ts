import {Document, Schema, model, PaginateModel} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import {IUser} from '../models/user.model';

export interface Iflight extends Document {
    from: {
        city: string,
        country: string
    };
    to: 
    {
        city: string,
        country: string,
    }; 
    landingTime: Number;
    departureTime: Number;
    passengers: Schema.Types.ObjectId[] | IUser[];
    limitPassager:number;
};

const flightSchema: Schema  = new Schema({
    from: {
        city: {type: String},
        country:{type: String},
    },
    to:{
        city: {type: String},
        country:{type: String}
    },
    landingTime:{type: Number, required:true},
    departureTime:{type: Number, required:true},
    passengers: [{type: Schema.Types.ObjectId, ref:"User"}],
    limitPassager:{type: Number, required:true},
    created:{type:Date, default: Date.now}
});


flightSchema.plugin(mongoosePaginate);
interface FlightModel<T extends Document> extends PaginateModel<T> {}

export const FlightModel: FlightModel<Iflight> = model<Iflight>('Flight', flightSchema) as FlightModel<Iflight>;
export default model<Iflight>('Flight', flightSchema);