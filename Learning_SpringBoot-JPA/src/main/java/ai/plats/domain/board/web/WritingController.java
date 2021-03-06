package ai.plats.domain.board.web;


import ai.plats.domain.board.entity.Writing;
import ai.plats.domain.board.service.WritingService;
import ai.plats.domain.comments.entity.Comments;
import ai.plats.domain.comments.service.CommentsService;
import ai.plats.domain.user.entity.User;
import ai.plats.domain.user.service.UserJoinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@org.springframework.stereotype.Controller
public class WritingController {
    @Autowired
    WritingService writingService;

    @Autowired
    UserJoinService userJoinService;//user 서비스


    @Autowired
    CommentsService commentsService;


    @RequestMapping({"/goWriting"})
    public String writing(Model model, Principal principal) {
        Optional<User> user = userJoinService.findUserByIdxUser(Integer.parseInt(principal.getName()));
        model.addAttribute("nick", ((User)user.get()).getUserNick());
        model.addAttribute("idxUser", ((User)user.get()).getIdxUser());
        return "board/writing";
    }

    @RequestMapping(value = {"/procWriting"},method = RequestMethod.POST)
    @ResponseBody
    public String procWriting(Writing writing,HttpServletRequest req) {
        String res;
        if(writingService.writing(writing,Integer.parseInt(req.getParameter("idxUser")))!=null){
            res = "success";
        }
        else{
            res="fail";
        }
        return res;
    }

    @RequestMapping(value={"/goViewWriting"},method = RequestMethod.GET)
    public String procWriting(Model model, Principal principal, @RequestParam("idxWriting") int idxWriting) {

        Writing viewWriting = writingService.getMyWriting(idxWriting);
        model.addAttribute("viewWriting", viewWriting);

        List<Comments> list=commentsService.findByIdxWriting(viewWriting.getIdxWriting());
        //System.out.println(list.get(0).getIdxComments());
        model.addAttribute("commentsList",list);
        model.addAttribute("idxUser", principal.getName());
        return "board/viewWriting";
    }




    @RequestMapping(value="/goUpdateWriting")
    public String goUpdateWriting(@RequestParam("idxWriting") int idxWriting, Model m) {

        Writing updateWriting = writingService.getMyWriting(idxWriting);
        m.addAttribute("updateWriting", updateWriting);

        return "board/updateWriting";
    }





    @RequestMapping(value="/procUpdateWriting", method= RequestMethod.POST)
    @ResponseBody
    public String procUpdateWriting(Writing writing,String modDateStr) {


        Writing vo =writingService.getMyWriting(writing.getIdxWriting());

        LocalDateTime parsedLocalDateTime = LocalDateTime.parse(modDateStr);
        vo.setTitle(writing.getTitle());
        vo.setContent(writing.getContent());
        vo.setModiDate(parsedLocalDateTime);
        writingService.updateWriting(vo);

        return "게시물 수정 완료 ! ";
    }



    @RequestMapping({"/goDelWriting"})
    public String delWriting(Writing writing) {
        Writing result = writingService.delWriting(writing);

        return "redirect:/";
    }



}
