import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";
import { BranchService } from "./branch.service";
import { CreateBranchDto } from "./dto/create-branch.dto";
import { UpdateBranchDto } from "./dto/update-branch.dto";
import { JwtAuthGuard } from "../common/guards/accessToken.guard";
import { RolesGuard } from "../common/guards/role.guard";
import { Roles } from "../common/decorators/roles";
import { adminRoles } from "../types";

@ApiTags("Branches")
@ApiBearerAuth()
@Controller("branches")
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  // 🟢 CREATE
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...adminRoles)
  @ApiOperation({ summary: "Create a new branch" })
  @ApiBody({ type: CreateBranchDto })
  @ApiResponse({ status: 201, description: "Branch successfully created" })
  @ApiResponse({ status: 403, description: "Forbidden. Admin access required." })
  create(@Body() createBranchDto: CreateBranchDto) {
    return this.branchService.create(createBranchDto);
  }

  // 🟢 GET ALL
  @Get()
  @ApiOperation({ summary: "Get list of all branches" })
  @ApiResponse({ status: 200, description: "List of branches returned" })
  findAll() {
    return this.branchService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get branch by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Branch found" })
  @ApiResponse({ status: 404, description: "Branch not found" })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.branchService.findOne(id);
  }

  // 🟢 UPDATE
  @Patch(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...adminRoles)
  @ApiOperation({ summary: "Update an existing branch" })
  @ApiParam({ name: "id", type: Number })
  @ApiBody({ type: UpdateBranchDto })
  @ApiResponse({ status: 200, description: "Branch successfully updated" })
  @ApiResponse({ status: 404, description: "Branch not found" })
  @ApiResponse({ status: 403, description: "Forbidden. Admin access required." })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateBranchDto: UpdateBranchDto
  ) {
    return this.branchService.update(id, updateBranchDto);
  }

  // 🟢 DELETE
  @Delete(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...adminRoles)
  @ApiOperation({ summary: "Delete a branch" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Branch successfully deleted" })
  @ApiResponse({ status: 404, description: "Branch not found" })
  @ApiResponse({ status: 403, description: "Forbidden. Admin access required." })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.branchService.remove(id);
  }
}
