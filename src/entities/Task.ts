import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class Task{
    @Field(() => Number)
    id!: number;

    @Field()
    name!: string;

    @Field({nullable: true})
    description?: string;

    @Field({defaultValue: false})
    state!: Boolean;
}