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
    public class ContractController : BaseApiController
    {
        private readonly InsurewaveContext _context;
        public UserTable LoggedUser;
        public ContractController(InsurewaveContext context)
        {
            _context = context;

        }

        [HttpGet("contracts/{id}")]

        public async Task<ActionResult<List<ContractTable>>> GetContract(int id)
        {
            try
            {
                var us = _context.ContractTables.Where(c => c.LoginId == id).ToList();
                if (us == null)
                {
                    return NoContent();
                }
                return us;
            }
            catch (Exception ex)
            {

                return NotFound(ex.Message);
            }
        }

        [HttpPost("contracts/{id}")]
        public async Task<ActionResult<ContractTable>> PostContract(ContractTable cont)
        {
            try
            {
                _context.ContractTables.Add(cont);
                await _context.SaveChangesAsync();
                return cont;
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
        [HttpPut("contracts/{id}")]
        public async Task<IActionResult> PutStatus(ContractTable cont)
        {
            try
            {
                var WallE = _context.ContractTables.FirstOrDefault(o => o.ContractId == cont.ContractId);
                if (WallE == null)
                {
                    return BadRequest("Contract Doesn't Exist!");
                }
                WallE.ContracrStatus = "To Broker";
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("Delcontracts/{id}")]
        public async Task<IActionResult> DeleteContract(int id)
        {
            try
            {
                var bro = await _context.ContractTables.FindAsync(id);
                if (bro == null)
                {
                    return NotFound("Contract Not Found");
                }
                if (bro.AssetTables != null)
                {
                    bro.AssetTables.Clear();
                }
                _context.ContractTables.Remove(bro);
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpPut("broker/{id}")]
        public async Task<IActionResult> PutBroker(ContractTable cont)
        {
            try
            {
                var brk = _context.ContractTables.FirstOrDefault(o => o.ContractId == cont.ContractId);
                if (brk == null)
                {
                    return BadRequest("Contract Doesn't Exist!");
                }
                brk.ContracrStatus = "To Insurer";
                brk.BrokerCommission = cont.BrokerCommission;
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
        [HttpGet("all/{id}")]
        public async Task<ActionResult<List<ContractTable>>> GetContract(string ua)
        {
            try
            {
                if (ua == "Client")
                {
                    return BadRequest("UnAuthorized Access (Not Allowed)");
                }
                var all = _context.ContractTables.ToList();
                return all;
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
        [HttpPut("Insurer/{id}")]
        public async Task<IActionResult> PutInsurer(ContractTable cont)
        {
            try
            {
                var insr = _context.ContractTables.FirstOrDefault(o => o.ContractId == cont.ContractId);
                if (insr == null)
                {
                    return BadRequest("Contract Doesn't Exist!");
                }
                insr.ContracrStatus = cont.ContracrStatus;
                insr.InsurerComments = cont.InsurerComments;
                insr.MonthlyPremium = cont.MonthlyPremium;
                insr.AssuredSum = cont.AssuredSum;
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
    }
}
