import {Controller, Query, Get, Param} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {ListStruct, Result} from "../api/ApiResult";
import StakingService from "../service/staking.service";
import {
    // ValCommissionRewReqDto,
    CommissionInfoReqDto,
    // ValCommissionRewResDto,
    CommissionInfoResDto,
    ValidatorDelegationsReqDto,
    ValidatorDelegationsResDto,
    ValidatorUnBondingDelegationsReqDto,
    ValidatorUnBondingDelegationsResDto,
    allValidatorReqDto,
    stakingValidatorResDto,
    ValidatorDetailAddrReqDto,
    ValidatorDetailResDtO,
    AccountAddrReqDto,
    AccountAddrResDto,
    DelegatorsDelegationsReqDto,
    DelegatorsDelegationsResDto,
    DelegatorsUndelegationsReqDto,
    DelegatorsUndelegationsResDto
} from "../dto/staking.dto";

@ApiTags('Staking')
@Controller('staking')
export class StakingController {
    constructor(private readonly stakingService: StakingService) {
    }

    @Get('/commission_info')
    async getAllValCommissionInfo(@Query()q: CommissionInfoReqDto): Promise<Result<ListStruct<CommissionInfoResDto>>> {
        const allValCommissionData: ListStruct<CommissionInfoResDto> = await this.stakingService.getAllValCommission(q)
        return new Result<ListStruct<CommissionInfoResDto>>(allValCommissionData)
    }

    @Get('/validators/:address/delegations')
    async getValidatorDelegations(@Param()q: ValidatorDelegationsReqDto): Promise<Result<ListStruct<ValidatorDelegationsResDto>>> {
        const validatorDelegations = await this.stakingService.getValidatorDelegationList(q)
        return new Result<ListStruct<ValidatorDelegationsResDto>>(validatorDelegations)
    }

    @Get('/validators/:address/unbonding-delegations')
    async getValidatorUnBondingDelegations(@Param()q: ValidatorUnBondingDelegationsReqDto): Promise<Result<ListStruct<ValidatorUnBondingDelegationsResDto>>> {
        const validatorUnBondingDelegations = await this.stakingService.getValidatorUnBondingDelegations(q)
        return new Result<ListStruct<ValidatorUnBondingDelegationsResDto>>(validatorUnBondingDelegations)
    }

    @Get('/validators')
    async getValidators(@Query()q: allValidatorReqDto): Promise<Result<ListStruct<stakingValidatorResDto>>> {
        const queryValidators = await this.stakingService.getValidatorsByStatus(q)
        return new Result<ListStruct<stakingValidatorResDto>>(queryValidators)
    }

    @Get('/validators/:address')
    async getValidatorDetail(@Param()q: ValidatorDetailAddrReqDto): Promise<Result<ValidatorDetailResDtO>> {
        const queryValidatorDetail = await this.stakingService.getValidatorDetail(q)
        return new Result<ValidatorDetailResDtO>(queryValidatorDetail)
    }

    @Get('/account/:address')
    async getAddressAccount(@Param()q: AccountAddrReqDto): Promise<Result<AccountAddrResDto>> {
        const addressAccount = await this.stakingService.getAddressAccount(q)
        return new Result<AccountAddrResDto>(addressAccount)
    }

    // @Get("delegators/:delegatorAddr/rewards")
    // async queryDelegatorRewards(@Param() query: DelegatorRewardsReqDto): Promise<Result<DelegatorRewardsResDto>> {
    //     const data: DelegatorRewardsResDto = await this.distributionService.queryDelegatorRewards(query);
    //     return new Result<DelegatorRewardsResDto>(data);
    // }
    
    @Get('/delegators/:delegatorAddr/delegations')
    async getDelegatorsDelegations(@Param()q: DelegatorsDelegationsReqDto): Promise<Result<ListStruct<DelegatorsDelegationsResDto>>> {
        const delegatorsDelegations = await this.stakingService.getDelegatorsDelegations(q)
        return new Result<ListStruct<DelegatorsDelegationsResDto>>(delegatorsDelegations)
    }

    @Get('/delegators/:delegatorAddr/unbonding_delegations')
    async getDelegatorsUndelegations(@Param()q: DelegatorsUndelegationsReqDto): Promise<Result<ListStruct<DelegatorsUndelegationsResDto>>> {
        const delegatorsUndelegations = await this.stakingService.getDelegatorsUndelegations(q)
        return new Result<ListStruct<DelegatorsUndelegationsResDto>>(delegatorsUndelegations)
    }
}
