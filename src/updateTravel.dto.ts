import { IsInt, IsNotEmpty, IsString, IsUrl, IsPositive, MinLength, Max, Min, IsNumber, IsOptional } from "class-validator";

export class updateTravel{

    @IsOptional()
    @IsInt()
    id?: number;

    @IsOptional()
    @IsString()
    @IsNotEmpty({message: "Destination Cannot Be Empty"})
    destination?: string;


    @IsOptional()
    @IsString()
    @IsNotEmpty({message: "Description Cannot Be Empty"})
    @MinLength(30, {message: "Description Must Be At Least 30 Characters"})
    description?: string;

    @IsOptional()
    @IsUrl()
    @IsNotEmpty({message: "URL Cannot Be Empty"})
    imgURL?: string;

    @IsOptional()
    @IsInt()
    @IsNotEmpty({message: "Field Cannot Be Empty"})
    @IsPositive({message: "Price Cannot Be Negative"})   
    price?: number;

    @IsOptional()
    @IsNumber()
    @IsNotEmpty({message: "Discount Cannot Be Empty"})
    @Max(50, {message: "Discount Cannot Be More Than 50%"})
    @Min(0, {message: "Discount Cannot Be Less Than 0%"})
    discount?: number;
}