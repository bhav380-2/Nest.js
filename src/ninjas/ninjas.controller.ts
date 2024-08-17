import { Controller, Get,Param,Post,Put,Delete, Query, Body, NotFoundException, ParseIntPipe, ValidationPipe, UsePipes } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
// import { ValidationPipe } from '@nestjs/common';

@UsePipes(new ValidationPipe({transform: true})) 
@Controller('ninjas')
export class NinjasController {

    constructor(private readonly ninjasService: NinjasService){

    }


    // GET /ninjas ?weapon=fast--> []
    @Get()
    getNinjas(@Query('weapon') weapon:'stars' | 'nunchucks'){
        return this.ninjasService.getNinjas(weapon);
    }




    // GET /ninjas/:id --> {...}
    @Get(':id')
    getOneNinja(@Param('id',ParseIntPipe) id: number){

        try{
            return this.ninjasService.getNinja(id);

        }catch(err){

            throw new NotFoundException();

        }

      
        
    }
    // POSt /ninjas
    
    @Post()
    // @UsePipes(new ValidationPipe({ transform: true }))
    createNinja(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto){

        return this.ninjasService.createNinja(createNinjaDto)
        
    }
    // PUT //ninjas/:id --> {...}

    @Put(':id')
    updateNinja(@Param('id') id:string, @Body() updateNinjaDto:UpdateNinjaDto){
        return this.ninjasService.updateNinja(+id,updateNinjaDto);
       
    }
    // DELETE /ninjas/:id
    @Delete(":id")
    removeNinja(@Param('id') id:string){
        return this.ninjasService.removeNinja(+id);
    }

}



