using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.DTO;
using WebApplication1.Interfaces;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly InsurewaveContext _context;
        public UserTable LoggedUser;
        public AccountController(InsurewaveContext context )
        {
            _context = context;
           
        }


        [HttpPut("assets/{id}")] // Linking assets to contract
        public async Task<IActionResult> PutAssets(AssetTable ass)
        {
            try
            {
                AssetTable tes = _context.AssetTables.FirstOrDefault(c => c.AssetId == ass.AssetId);
                if (tes == null)
                {
                    return NotFound("Asset Not Found");
                }
                tes.ContractId = ass.ContractId;
                ContractTable be = _context.ContractTables.FirstOrDefault(c => c.ContractId == tes.ContractId);
                be.TotalAssetValue = be.TotalAssetValue + tes.AssetPrice;
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            } 
        }



        [HttpGet("assets/{id}")] // Assets linked to one user
        public async Task<ActionResult<List<AssetTable>>> GetAssets(int id)
        {
            try
            {
                var use1 = _context.AssetTables.Where(x => x.LoginId == id);
                if (use1 == null)
                {
                    return BadRequest("Id not found!");
                }
                var x = use1.ToList();
                return x;
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

        }


        [HttpPost("assets")] //posting assets
        public async Task<ActionResult<AssetTable>> Postassets(AssetTable ass)
        {
            try
            {
                if (LoggedUser != null)
                {
                    ass.LoginId = LoggedUser.LoginId;
                }
                _context.AssetTables.Add(ass);
                await _context.SaveChangesAsync();
                return ass;
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("DeleteAssets/{id}")]
        public async Task<IActionResult> DeleteAssets(int id)
        {
            try
            {
                var bro = await _context.AssetTables.FindAsync(id);
                if (bro == null)
                {
                    return NotFound("Asset Not Found");
                }
                if (bro.ContractId != null)
                {
                    ContractTable be = await _context.ContractTables.FirstOrDefaultAsync(c => c.ContractId == bro.ContractId);
                    be.AssuredSum = be.AssuredSum - bro.AssetPrice;
                }
                _context.AssetTables.Remove(bro);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }



        [HttpPost("register")]
        public async Task<ActionResult<UserTable>> Register(UserTable user)
        {
            try
            {
                if (await UserExists(user.Email)) return BadRequest("Email already registered!");

                _context.UserTables.Add(user);
                await _context.SaveChangesAsync();
                LoggedUser = user;
                return user;
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserTable>> Login(LoginDto loginDto)
        {
            try
            {
                var user = await _context.UserTables.SingleOrDefaultAsync(x => x.Email == loginDto.email);
                if (user == null || user.Password != loginDto.password) return Unauthorized("Invalid Email Address or Password");
                LoggedUser = user;
                return user;
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
        private async Task<bool> UserExists(string mail)
        {
            return await _context.UserTables.AnyAsync(x => x.Email.ToLower() == mail.ToLower());
        }

    }
}

/* 
 * CONTRACT API : GET CONTRACTS || DELETE CONTRACTS || POST CONTRACTS || PUT CONTRACTS (WHEN I CLICK ON SEND CONTRACT BUTTON ON THE FRONTEND ,
 * THE CONTRACT STATUS WILL CHANGE TO "WITH BROKER" )
 * 
 * BROKER API : PUT CONTRACTS (BROKER WILL CHANGE THE STATUS TO "SEND TO INSURER" AND HE/SHE CAN ADD HIS/HER COMMISSION)
 * 
 * INSURER API : PUT CONTRACTS (THE INSURER WILL CHANGE THE STATUS TO EITHER ACTIVE OR REJECT , IF ACTIVE THEN THE STATUS CHANGES TO "ACTIVE" AND GIVE
 * ASSURED SUM & COVERAGE % , INSURER CAN ADD HIS COMMENTS ON THE CONTRACT)
 * 
 * <><><><><><><><><><> API PART DONE <><><><><><><><><><>
 * 
 * CONTRACT COMPONENT : SEND BUTTON , CREATE BUTTON , DISPLAY CONTRACTS WITH STATUS OF IT & COVERAGE PERCENTAGE BANNER
 * 
 * BROKER COMPONENT : SEND TO INSURER , ADD COMMISSION AND DISPLAY CONTRACTS
 * 
 * INSURER COMPONENT : ACTIVE / REJECT , ADDING COMMENTS, ADDING ASSURED SUM & COVERAGE % AND DISPLAYING CONTRACT DETAILS
 * 
 */
