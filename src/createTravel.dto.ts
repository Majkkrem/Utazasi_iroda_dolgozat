import { IsInt, IsNotEmpty, IsString, IsUrl, IsPositive, MinLength, Max, Min, IsNumber } from "class-validator";

export class createNewTravel{

    @IsInt()
    id: number;

    @IsString()
    @IsNotEmpty({message: "Destination Cannot Be Empty"})
    destination: string;



    @IsString()
    @IsNotEmpty({message: "Description Cannot Be Empty"})
    @MinLength(30, {message: "Description Must Be At Least 30 Characters"})
    description: string;

    @IsUrl()
    @IsNotEmpty({message: "URL Cannot Be Empty"})
    imgURL: string;

    @IsInt()
    @IsNotEmpty({message: "Field Cannot Be Empty"})
    @IsPositive({message: "Price Cannot Be Negative"})   
    price: number;


    @IsNumber()
    @IsNotEmpty({message: "Discount Cannot Be Empty"})
    @Max(50, {message: "Discount Cannot Be More Than 50%"})
    @Min(0, {message: "Discount Cannot Be Less Than 0%"})
    discount: number;
}