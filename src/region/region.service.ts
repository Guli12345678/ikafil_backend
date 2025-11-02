import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateRegionDto } from "./dto/create-region.dto";
import { UpdateRegionDto } from "./dto/update-region.dto";
import { UZBEKISTAN_REGIONS } from "./regions.data";

@Injectable()
export class RegionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRegionDto: CreateRegionDto) {
    throw new ForbiddenException("Regions are static and cannot be created");
  }

  async findAll() {
    return UZBEKISTAN_REGIONS;
  }

  async findOne(id: number) {
    const idx = id - 1;
    if (idx < 0 || idx >= UZBEKISTAN_REGIONS.length)
      throw new NotFoundException(`Region with ID ${id} not found`);
    return { id, name: UZBEKISTAN_REGIONS[idx] };
  }

  async update(id: number, updateRegionDto: UpdateRegionDto) {
    throw new ForbiddenException("Regions are static and cannot be updated");
  }

  async remove(id: number) {
    throw new ForbiddenException("Regions are static and cannot be removed");
  }
}
