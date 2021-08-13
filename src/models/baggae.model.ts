import {Document, Schema, model, PaginateModel} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

export interface IBaggage extends Document {
    user: string;
    flight: string;
    weight: Number;
    linear_size: Number;
    persona_item: Boolean;
    hand_luggage: Boolean;
};

const baggageSchema: Schema = new Schema({
    user: {type: Schema.Types.ObjectId, ref:"User"},
    flight: {type: Schema.Types.ObjectId, ref:"Flight"},
    weight: {type: Number},
    linear_size: {type: Number},
    persona_item: {type: Boolean},
    hand_luggage: {type: Boolean},
    created:{type:Date, default: Date.now}
});

baggageSchema.plugin(mongoosePaginate);
interface BaggagetModel<T extends Document> extends PaginateModel<T> {}

export const BaggagetModel: BaggagetModel<IBaggage> = model<IBaggage>('Baggage', baggageSchema) as BaggagetModel<IBaggage>;
export default model<IBaggage>('Baggage', baggageSchema);