const Inout = new (require("../Inout"))("Daily Coding Problem --- Election day");
const fs = require("fs");
const readline = require('readline');
const Helper = require("../Helper");

/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Uber.

    On election day, a voting machine writes data in the form (voter_id, candidate_id) to a text file. 
    Write a program that reads this file as a stream and returns the top 3 candidates at any given time. 
    If you find a voter voting more than once, report this as fraud.

*/

/*
    const result = [];
    const dict = {}
    const candidates = [
        '243d7df2bed', '855f31c2e7f', '37f3994c29f',
        '4feee8311d3', '865a814c263', '70d52c36524',
        '639a1cd3499', '71ecb33b0c9', '7e14a7dbe6b',
        '55a95f28145', '76ba312ca1f', '28ff7c1768b',
        '2464f5b91f8', 'a0e2798577',  '8fb2c1227ba',
        '621e8c62fb5', '3ddc4b17811', '98ad612884',
        '3b1b365ac84', '224238aea3f', '5e6feeace68',
        '6694ffa58d3', '40913290b26', '5b786e3871a',
        '36dd686ddea', '3f7e70db50a', '112874a1372',
        '19724f8ac8f', '6d7777bed91', '61cb8a37fd',
        '5e5bb94b3f7', '7eb73a80fe'
    ];

    for (let i = 0; i < 10e4; i++) {
        const voterId = Math.floor((Math.random() * 10e12)).toString(16);
        if (voterId in dict) continue;
        dict[voterId] = voterId;
        const random = Math.floor(Math.random() * candidates.length);
        const candidate = candidates[random];
        result.push([voterId, candidate]);

        fs.appendFileSync("./300-voters1.txt", `(${voterId}, ${candidate})\r\n`)
        if(i%10e2 === 0) {
            console.log(i / 10e4 * 100);
        }
    }
*/

Inout.input_Copy = arg => arg;
Inout.input_Converter = path => {
    const read = fs.createReadStream(path);
    read.setEncoding('utf-8');

    // https://stackoverflow.com/questions/6156501/read-a-file-one-line-at-a-time-in-node-js
    const rl = readline.createInterface({
        input: read,
        crlfDelay: Infinity
    });
    return { readStream: rl };
}

Inout.input_stringConverter = arg => `(Readstream) from filepath:  '${arg.readStream.path}'`;

Inout.push('./dailyCodingProblem/300-voters1.txt', Inout.static.None);
Inout.push('./dailyCodingProblem/300-voters2.txt', Inout.static.None);


Inout.solvers = [processVoters]

Inout.solve();



/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

async function processVoters(readStream) {


    let totalVotes = 0;

    const candidates = {};
    const FraudedVoters = {};
    const voters = {};

    for await (const chunk of readStream) {

        totalVotes++;
        const [voterId, candId] = chunk.replace('(', '').replace(')', '').split(',');

        if (!(candId in candidates))
            candidates[candId] = 0;

        if (voterId in voters) {

            if (voterId in FraudedVoters)
                FraudedVoters[voterId]++;
            else
                FraudedVoters[voterId] = 2;

            const lastVote = voters[voterId];
            voters[voterId] = candId;
            candidates[lastVote]--;
        }
        else {
            voters[voterId] = candId;
            candidates[candId]++;
        }
    }


    const topThree = Object.keys(candidates).
        sort((a, b) => candidates[b] - candidates[a]).
        slice(0, 3).map(v => ({ id: v, votes: candidates[v] }));

    const voteFrauds = Object.entries(FraudedVoters).map(v => ({ voterId: v[0], votesTaken: v[1] }));
    const fraudedVotes = voteFrauds.length === 0 ? 0 : Object.values(FraudedVoters).reduce((acc, v) => acc + v);

    return {
        totalVotes: totalVotes,
        fraudVotes: fraudedVotes,
        countedVotes: totalVotes - fraudedVotes,
        TopCandidates: topThree,
        voteFrauds: voteFrauds
    }

}